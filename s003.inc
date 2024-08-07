;stm8s003f4 include
;-------------SPI----------

#define SPI_CR1  $5200;
#define	SPI_CR2 $5201;
#define	SPI_ICR  $5202;
#define	SPI_SR	$5203;
#define	SPI_DR	$5204;
#define	SPI_CRCPR	$5205;
#define	SPI_RXCRCR	$5206;
#define	SPI_TXCRCR	$5207;
;---------------I2C----------

#define	I2C_CR1		$5210;
#define	I2C_CR2 	$5211;
#define	I2C_FREQR	$5212;
#define	I2C_OARL 	$5213;
#define	I2C_OARH	$5214;
#define	I2C_DR 		$5216;
#define	I2C_SR1		$5217;
#define	I2C_SR2 	$5218;
#define	I2C_SR3		$5219;
#define	I2C_ITR		$521A;
#define	I2C_CCRL 	$521B;
#define	I2C_CCRH	$521C;
#define	I2C_TRISER	$521D;
#define	I2C_PECR	$521E;
;------------UART--------------
#define	UART1_SR	$5230;
#define	UART1_DR 	$5231;
#define	UART1_BRR1	$5232;
#define	UART1_BRR2	$5233;
#define	UART1_CR1	$5234;
#define	UART1_CR2	$5235;
#define	UART1_CR3	$5236;
#define	UART1_CR4	$5237;
#define	UART1_CR5	$5238;
#define	UART1_GTR	$5239;
#define	UART1_PSCR	$523A;
;----------TIM4----------------
#define	TIM4_CR1	$5340;
#define	TIM4_IER	$5343;
#define	TIM4_SR		$5344;
#define	TIM4_EGR	$5345;
#define	TIM4_CNTR	$5346;
#define	TIM4_PSCR	$5347;
#define	TIM4_ARR 	$5348;
---------ADC1-----------------

#define ADC _CSR 	$5400;
#define	ADC_CR1		$5401;
#define	ADC_CR2		$5402;
#define	ADC_CR3		$5403;
#define	ADC_DRH		$5404;
#define	ADC_DRL		$5405;
#define	ADC_TDRH	$5406;
#define	ADC_TDRL	$5407;
#define	ADC_HTRH	$5408;
#define	ADC_HTRL	$5409;
#define	ADC_LTRH	$540A;
#define	ADC_LTRL	$540B;
#define	ADC_AWSRH 	$540C;
#define	ADC_AWSRL	$540D;
#define	ADC_AWCRH	$540E;
#define	ADC_AWCRL 	$540F;
;----------TIM2----------
#define	TIM2_CR1 	$5300;
#define	TIM2_IER	$5303;
#define	TIM2_SR1 	$5304;
#define	TIM2_SR2	$5305;
#define	TIM2_EGR	$5306;
#define	TIM2_CCMR1	$5307;
#define	TIM2_CCMR2	$5308;
#define	TIM2_CCMR3	$5309;
#define	TIM2_CCER1	$530A;
#define	TIM2_CCER2	$530B;
#define	TIM2_CNTRH 	$530C;
#define	TIM2_CNTRL  $530D;
#define	TIM2_PSCR	$530E;
#define	TIM2_ARRH	$530F;
#define	TIM2_ARRL	$5310;
#define	TIM2_CCR1H	$5311;
#define	TIM2_CCR1L	$5312;
#define	TIM2_CCR2H  $5313;
#define	TIM2_CCR2L	$5314;
#define	TIM2_CCR3H	$5315;
#define	TIM2_CCR3L	$5316;
