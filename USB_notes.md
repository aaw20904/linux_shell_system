There are 4 layers:

## Physical layer


A full-speed device stays in Idle J state until host starts polling.
Definitions for full-speed:

    -J state: D+ = HIGH, D– = LOW
    -K state: D+ = LOW, D– = HIGH

NRZI encoding:

    Logical 1: maintain previous state
    Logical 0: toggle between J/K


Bit timings, pull-ups, differential DP/DM signalling.
TinyUSB and the MCU peripheral handle all of this. You won’t touch it.

    -Logical J and K states are encoded as combinations of D+ and D–
    -Idle is a J state
    -Data bits are encoded as transitions between J and K (NRZI)

The absolute voltage doesn't matter much; the receiver listens for the difference between D+ and D–.

HOST ALWAYS STARTS: No device-to-host communication until host sends packets

USB is strictly host driven.

The device does NOT send anything unless the host explicitly asks.

## 2. USB protocol layer

This is where packets live. USB packets are LEGO bricks:
USB has only three packet types:

### 1.Token packets

      -IN
      -OUT
      -SETUP
      -(also SOF, PING, etc)
        They say “host wants to read/write from endpoint X”.

### 2.Data packets
    -DATA0
    -DATA1
    -(DATA2, MDATA for high-speed)
     Contain your bytes.

### 3.Handshake packets
    -ACK
    -NAK
    -STALL  (And a few others)


## USB transactions

A transaction is usually:

      -Host sends Token
      -Then Data
      -Device answers with ACK

Or the opposite for an IN transfer.

This is like the “function call” layer.


## USB Transactions (high level )

This is where endpoints make sense:

    -Control transfer (mandatory EP0)
    -Interrupt transfer (HID, CDC notifications)
    -Bulk transfer (CDC-ACM data, MSC, etc)
    -Isochronous (audio/video, time-critical)


This is the layer TinyUSB really works at.


## USB application layer classes

This is what TinyUSB exposes:

    -CDC: virtual COM port
    -HID: keyboard, mouse, custom HID
    -MSC: USB flash drive
    -DFU: firmware updates
    -Audio
    -MIDI


Think of classes like “protocol profiles”.
Exactly like TCP → HTTP/FTP/SSH.
### ------------------------------DEEP---EXPLANATION----------------------------------------------
2 PROTOCOL LAYER.
USB packet format:

    
   | SYNC | PID | PAYLOAD | CRC | EOP |
   


  A) 'SYNC' field: This is an 8-bit pattern used to synchronize the receiver.
For full speed  it is : KJKJKJKK   (NRZI-encoded)
  B) "PID" field  (Packet Identifier): Lower 4 bits = PID type,Upper 4 bits = complement (inverted)
  
        OUT    = 0001b → PID byte = 0001 1110b = 0xE1  
        IN     = 1001b → PID byte = 1001 0110b = 0x69  
        SETUP  = 1101b → 0x2D
        DATA0  = 0011b → 0xC3
        ACK    = 0010b → 0xD2
        
  Packet Types (USB only has three):
  **-----Token packets---**
Used by the host to say what it wants:

      -IN → “device, give me data”
      -OUT → “device, I will send you data”
      -SETUP → “control transfer beginning”
      -(SOF, PING, etc exist too)
      
   A tocken packet contains:
   __________________________________________________
   |PID | Address (7 bits) | Endpoint (4 bits) | CRC5|

✅ **1. OUT**

PID = 0001 (0xE1)

Meaning:“Device, I want to send data to your endpoint.”

Used before a DATA packet host → device.

✅ **2. IN**

PID = 1001 (0x69)

Meaning:“Device, give me data.”

Device responds with DATA0/1 or NAK.


✅**3.SETUP**

-PID = 1101 (0x2D)

This one starts every control transfer.

Meaning: “Device, incoming setup request on EP0. Prepare to receive 8 bytes.”

Very important for enumeration.

✅**4. SOF (Start of Frame)**

PID = 0101 (0xA5)

Host sends this every 1ms (full speed).

Contains a 11-bit frame number.

Used for:
    -bus timing
    -isochronous scheduling
    -keeping device alive

✅ **5. PING (high-speed only)**

PID = 0100 (0xB4)

Host uses it in HS bulk transfers to ask: “Do you have buffer space ready for OUT data?”

(Instead of sending data blindly.)

Full-speed devices never see PING.

 ### --------Data packets-------------- 

Contain actual payload:
      -DATA0
      -DATA1
      -(also DATA2 and MDATA at HS)
_____________________________________________________
|PID | Data (0–1023 bytes depending on speed) | CRC16|

### --------Handshake--packets---------

One byte long, no payload:

✅ **1. ACK**

PID = 0010 (0xD2)

Meaning:“I received your data successfully.”

Used when:

    -Device ACKs host → after an OUT data packet
    -Host ACKs device → after an IN data packet

Effects:
DATA0/1 toggle flips
Host considers transfer successful

✅ **2. NAK**

PID = 1010 (0x5A)

Meaning: “Not ready right now — try again later.”

Used when:

    -Device has no data to send (IN request)
    -Device cannot accept data yet (OUT request)

Important:

-NAK is not an error.

    -USB host will retry automatically, many times per second.
    -HID and CDC use this heavily.


In TinyUSB you often see NAKs flying constantly — totally normal.

✅ **3. STALL**

PID = 1110 (0x1E)

Meaning: “This endpoint is halted or the request is unsupported.”

Used for:

    -EP0 control request is invalid
    -Device intentionally blocks an endpoint until software fixes it


Driver-level behavior:

        -Host must clear the stall using CLEAR_FEATURE
        -After clearing, DATA0/1 toggle resets to DATA0

You normally see STALL only when:

    -A descriptor field is wrong
    -A control request is unimplemented

You purposely stalled an endpoint (common in HID)

✅**4. NYET (High-speed only)**

PID = 0110 (0x4E)

Meaning:

“Not yet — device received package but can’t process next one yet.”

Use case:

    -High-speed bulk OUT
    -Indicates device accepted the packet, but buffer isn’t ready for another yet
    Full-speed devices (even on STM32 FS) will never send NYET.

✅ **5. ERR (rare, mostly low-speed)**

PID = 1100 (0x3C)

    Meaning: “Error in split transaction.”
    Used internally by hub split transactions.
    Device firmware never generates this.

✅ **6. Preamble handshake (ignored for FS)**

PID = 1100 but in LS context.

Used for low-speed hubs only.

STM32 devices never use this.

✅ How these handshakes fit into transactions

### ✅  Example OUT Transaction (host → device)

Token: OUT

DATA0/1 (host sends payload)

Handshake from device:

      ACK → data accepted
      NAK → device busy
      STALL → endpoint halted
  

### ✅ Example IN Transaction (device → host)

Token: IN

Device responds with:
      DATA0/1 (payload)
      NAK (nothing to send)
      STALL (endpoint halted)
  
Host:

    sends ACK if it received data


###    Transactions   

**!!! Device is NEVER allowed to start; host starts every transaction.**

Example 1: OUT Transaction (host → device):

    HOST → DEVICE:    OUT   (token)
    HOST → DEVICE:    DATA0 or DATA1
    DEVICE → HOST:    ACK or NAK or STALL
    
    
    Example 2: IN Transaction (device → host)
    
    HOST → DEVICE:    IN    (token)
    DEVICE → HOST:    DATA0 or DATA1 or NAK
    HOST → DEVICE:    ACK


**Data Toggle (DATA0 / DATA1)**

This mechanism prevents duplicate packets.

Rule:
    
    -Host and device each maintain a toggle bit per endpoint direction
    
    -Toggle flips after each successful data transaction (ACKed)



**NRZI Encoding + Bit Stuffing**

Two tricks USB uses on the wire:

✅ NRZI (Non-Return to Zero Inverted)

    Logical “1” = no transition
    Logical “0” = transition

This means long strings of “1” give no edges → receiver would lose sync.

**✅ Bit Stuffing**
    To prevent long runs with no transitions, USB inserts a 0 after every six consecutive 1s.
    
    Hardware removes these stuffed bits automatically.
    
    You never touch this in firmware, but knowing it helps when decoding logic analyzer captures.


**Start-of-Frame packets (SOF)**

Host sends SOF every:
    
      -1 ms on full-speed
      -125 µs on high-speed (microframes)
  
Used for:

      -keeping the bus alive
      -scheduling isochronous transfers

Most device classes don’t care about SOF, but TinyUSB receives them internally.

**Error handling**

If PID check fails → drop packet

If CRC fails → drop packet

If handshake missing → host retries

If device sends NAK → host retries later

USB has no “abort” — the host just keeps retrying.

### ✅ Summary of Layer 2 (Protocol Layer)

USB protocol layer defines:

    -Packet format
    -Types: TOKEN / DATA / HANDSHAKE
    -Transactions: OUT / IN / SETUP
    -NRZI + bit stuffing
    -DATA0/DATA1 toggling
    -SOF frames
    -Control transfer rules

*****************************
### ✅ DATA PACKET TYPES (very brief)

USB basically uses two data PIDs in full-speed:

      1. DATA0
      2. DATA1
   
Used for the DATA toggle mechanism (odd/even behavior you remember).

These two handle 99% of all USB transfers.

High-speed adds two more:

      5. DATA2
      7. MDATA
     
Used only for special high-speed split or isochronous sequences.

You will never use these on STM32 Full-Speed hardware.
******************************************************************
## ✅ USB TRANSFERS (the real “layer 3”)

Transfers are big operations composed of many transactions.
USB defines four transfer types, each with different rules.
### ✅ 1. Control Transfer

Used on endpoint 0, mandatory for all devices.
Used for enumeration, descriptors, configuration, standard requests.

3 stages:

1.Setup Stage
    
      SETUP token
      DATA0 (8-byte setup packet)
      
2.Data Stage (optional)
    
      Either IN or OUT
      One or more DATA0/1 packets
      
3.Status Stage

      Zero-length packet
      Opposite direction
      Always DATA1

Control transfers are reliable, retry on errors, and always use DATA toggles in a strict pattern.
TinyUSB handles almost all of this in the background.

### ✅ 2. Bulk Transfer

Used for “big data” and reliable delivery:
    
      -CDC-ACM (virtual COM port) data
      -MSC flash drive blocks
      -Custom data pipes
  
Characteristics:

      -Unlimited retries
      -No guaranteed timing
      -High throughput
      -Uses DATA0/1 toggles normally
      -Host polls continuously; device returns NAK when no data
  

### ✅ 3. Interrupt Transfer

Used for small packets that must be serviced periodically:
  
      -HID (keyboard/mouse)
      -HID custom reports
      -CDC notifications
      
Characteristics:
      -Guaranteed max latency
      -Small payload (8–64 bytes FS)
      -Periodic polling by host (1–10ms typical)
      -Not “real” hardware interrupts — host just polls the endpoint on schedule.

### ✅ 4. Isochronous Transfer

Used for real-time data (audio/video):

      -No retries
      -No ACK
      -No DATA toggles
      -Guaranteed bandwidth
      -Data loss allowed
      
STM32 FS barely supports this unless you’re doing USB audio.

| Type            | Reliable | Throughput | Timing          | Typical use      |
| --------------- | -------- | ---------- | --------------- | ---------------- |
| **Control**     | Yes      | Low        | Strict          | EP0, descriptors |
| **Bulk**        | Yes      | High       | No guarantees   | CDC, MSC         |
| **Interrupt**   | Yes      | Medium     | Periodic        | HID              |
| **Isochronous** | No       | High       | Guaranteed slot | Audio            |


## ✅ Endpoints

 

✅ Endpoints = “pipes” or “channels”

Each endpoint has a number: 0–15

And a direction:
    
    -OUT (host → device)
    -IN (device → host)

**✅ Endpoint 0**

    -Special
    -Bi-directional
    -Always exists
    -Used only for control transfers

**✅ Other endpoints (1…15)**

Each number may have:

      -an OUT endpoint
      -an IN endpoint
  
They are separate

(EP1 OUT is not the same as EP1 IN)

✅ Endpoints are NOT threads but FIFO buffers

Each endpoint is basically:

      a buffer
      a toggle state
      a type (bulk/interrupt/iso)

max packet size

hardware state machine for sending/receiving packets

They don’t run in parallel — the USB peripheral moves data automatically.

## Endpoint Descriptors

During enumeration, the device sends its descriptors to the host.

Each endpoint has its own Endpoint Descriptor, which looks like this:
| Field              | Size (bytes) | Description                                                                 |
| ------------------ | ------------ | --------------------------------------------------------------------------- |
| `bLength`          | 1            | Descriptor size (7 bytes)                                                   |
| `bDescriptorType`  | 1            | `0x05` for endpoint                                                         |
| `bEndpointAddress` | 1            | Bit7 = direction (1=IN, 0=OUT), Bits0–3 = endpoint number                   |
| `bmAttributes`     | 1            | Bits0–1 = Transfer type (00=Control, 01=Isochronous, 10=Bulk, 11=Interrupt) |
| `wMaxPacketSize`   | 2            | Max size of one packet                                                      |
| `bInterval`        | 1            | Polling interval (for Interrupt/Isochronous)                                |

   Example for endpoint 1 IN bulk:
   
        bLength            = 0x07
        bDescriptorType    = 0x05
        bEndpointAddress   = 0x81   (1000 0001b → IN, endpoint 1)
        bmAttributes       = 0x02   (Bulk)
        wMaxPacketSize     = 0x0040 (64 bytes)
        bInterval          = 0x00

### 🔌 3. How Enumeration Uses Endpoints

    1.Device connected → Host resets the port.
    2.Host assigns an address (SET_ADDRESS to endpoint 0).
    3.Host requests Device Descriptor via endpoint 0 control transfer.
    4.Host learns how many configurations, interfaces, and endpoints exist.
    5.Host requests Configuration Descriptor, which includes:
        -Interface descriptors
        -Endpoint descriptors
    6.Host configures the device (SET_CONFIGURATION), then starts using endpoints.
    
    So during enumeration, only endpoint 0 (control) is used.
    Other endpoints are “activated” only after configuration.

### ⚙️ 4. IN → ACK → Toggle → Next IN (Data Flow Example)

Let’s see how one IN transaction looks on the wire — for example, host reading from endpoint 1 IN.

    Token Packet (IN)
    
    Host sends:→
        [SYNC] [PID=IN] [DeviceAddr + EndpointNum + CRC5]
            This means: “Device, please send me data from endpoint 1.”
            Data Packet (DATA0 or DATA1)
    Device replies with:
        → [SYNC] [PID=DATAx] [DATA bytes + CRC16]
            DATAx alternates (toggle bit) — ensures synchronization.
            If host and device get out of sync, one will NACK to resynchronize.
    Host responds with the Handshake Packet (ACK)
        → [SYNC] [PID=ACK]
            Means: “I got your data correctly.”
    
    Next transfer:
    Toggle flips (DATA0 ↔ DATA1) for the next transaction.
    
  ***If there’s no data ready, the device replies with NAK instead of DATA0/DATA1.***

  ## Enumeration
## 🧩 1. Plug-in → Reset → Default State

1.Device physically connects to the USB bus.
    -Pull-up resistor (1.5 kΩ) on D+ (for Full-Speed) or D– (for Low-Speed) line tells the host which speed the device supports.
    -The host detects the voltage change and recognizes a new device.
2.Bus Reset:
    -The host sends a RESET (drives both D+ and D– low for 10 ms).
    -The device enters the Default State:
        -Its internal address = 0
        -Only Endpoint 0 (Control) is active.    
        
## ⚙️ 2. Default → Addressed State

Now the host begins enumeration using control transfers through endpoint 0.

### 1.GET_DESCRIPTOR (Device Descriptor, 8 bytes only)

The host requests the first 8 bytes to learn the MaxPacketSize0 (the size of control packets for EP0).

Example:
    bmRequestType: 80h  (Device-to-Host, Standard, Device)
    bRequest: GET_DESCRIPTOR (0x06)
    wValue: (DescriptorType << 8) | Index = (1 << 8) | 0  → Device Descriptor #0
    wLength: 8
    
### 2.Host resets again, then issues:

    SET_ADDRESS — assigns a unique device address (1–127).
    Device acknowledges with an ACK but doesn’t switch address until after the status stage is done.
    
**Device now enters the Addressed State.**

## 🧱 3. Addressed → Configured State

Now host can ask for full information.

### 1.GET_DESCRIPTOR (Device Descriptor, full length)
    18 bytes total.
    Includes VID, PID, device class, number of configurations.

### 2.GET_DESCRIPTOR (Configuration Descriptor)
    This descriptor is more complex because it includes:
        -Configuration Descriptor
        -Interface Descriptors
        -Endpoint Descriptors
        (and possibly HID, String, or other class-specific descriptors)
    The host usually requests the whole hierarchy in one long transfer.
    
### 3.SET_CONFIGURATION
    -The host selects a configuration (e.g. bConfigurationValue = 1).
    -The device moves to the Configured State — all endpoints described in this configuration become active.
    -Now the device is fully operational; host drivers start using its interfaces.

    
    | Descriptor                                         | Used When                  | Describes                                                                               | Typical Size    |
| -------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------- | --------------- |
| **Device Descriptor** (`bDescriptorType=1`)        | Always first               | Global device info: VID, PID, version, max packet size of EP0, number of configurations | 18 bytes        |
| **Configuration Descriptor** (`bDescriptorType=2`) | During configuration query | One specific configuration; total power, attributes (bus/self powered), #interfaces     | 9 bytes         |
| **Interface Descriptor** (`bDescriptorType=4`)     | Within configuration       | One interface (e.g. HID keyboard, CDC serial); class, subclass, protocol                | 9 bytes         |
| **Endpoint Descriptor** (`bDescriptorType=5`)      | Within interface           | Direction, type, max packet size, polling interval                                      | 7 bytes         |
| **String Descriptor** (`bDescriptorType=3`)        | Optional                   | Human-readable strings (Manufacturer, Product, Serial)                                  | Variable        |
| **HID Descriptor** (Class-specific)                | In HID interfaces          | Report descriptor length, HID version, country code                                     | 9 bytes typical |
| **Report Descriptor** (HID-specific)               | For HID class              | Defines the actual input/output report formats                                          | Variable        |

    
