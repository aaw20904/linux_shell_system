

/****/
//-----------STM8--------------
/*To create a new project in STVD you can add a C compiler 'Cosmic'
1)create a project - copy into a main folder the folder- 'STM8S_StdPeriph_Lib/STM8S_StdPeriph_Driver'
1.1)in the file  'stm8s.h'  - choose an MCU
2) in folder src add a file 'stm8s_it.c' and "stm8s_it.h" (you can find the one in folder 'STM8S_StdPeriph_Lib/Project/STM8S_StdPeriph_Examples/GPIO/GPIO_Toggle/'
2.1)Include in stm8s_it.c file - #include "stm8s_it.h" and comment unnecessary pheriperial or add allthe stdPeriph library in a project 
2.2) Comment in this file a 'INTERRUPT_HANDLER(NonHandledinterrupt){...}' function   (this handler in in the file 'stm8_interrupt_vector.c' ) to prevent redefining linking conflict
3)in the file 'stm8_interrupt_vector.c' (it create the IDE together with a new Workspace) 
   you can configurate an interrupt handler. To see it - you can read in the datasheet  which vector belongs to the corresponding peripheral.For example -
    the TIM4 belong to IRQ23. The name of the routine in the file 'stm8s_it.c' is 'TIM4_UPD_OVF_IRQHandler'.
*/
///----------in the stm8_interrupt_vector.c:-----
struct interrupt_vector const _vectab[] = {
	{0x82, (interrupt_handler_t)_stext}, /* reset */
	{0x82, NonHandledInterrupt}, /* trap  */
	{0x82, NonHandledInterrupt}, /* irq0  */
	{0x82, NonHandledInterrupt}, /* irq1  */
	{0x82, NonHandledInterrupt}, /* irq2  */
	{0x82, NonHandledInterrupt}, /* irq3  */
	{0x82, NonHandledInterrupt}, /* irq4  */
	{0x82, NonHandledInterrupt}, /* irq5  */
	{0x82, NonHandledInterrupt}, /* irq6  */
	{0x82, NonHandledInterrupt}, /* irq7  */
	{0x82, NonHandledInterrupt}, /* irq8  */
	{0x82, NonHandledInterrupt}, /* irq9  */
	{0x82, NonHandledInterrupt}, /* irq10 */
	{0x82, NonHandledInterrupt}, /* irq11 */
	{0x82, NonHandledInterrupt}, /* irq12 */
	{0x82, NonHandledInterrupt}, /* irq13 */
	{0x82, NonHandledInterrupt}, /* irq14 */
	{0x82, NonHandledInterrupt}, /* irq15 */
	{0x82, NonHandledInterrupt}, /* irq16 */
	{0x82, NonHandledInterrupt}, /* irq17 */
	{0x82, NonHandledInterrupt}, /* irq18 */
	{0x82, NonHandledInterrupt}, /* irq19 */
	{0x82, NonHandledInterrupt}, /* irq20 */
	{0x82, NonHandledInterrupt}, /* irq21 */
	{0x82, NonHandledInterrupt}, /* irq22 */
	{0x82, (interrupt_handler_t)TIM4_UPD_OVF_IRQHandler}, /* irq23 */
	{0x82, NonHandledInterrupt}, /* irq24 */
	{0x82, NonHandledInterrupt}, /* irq25 */
	{0x82, NonHandledInterrupt}, /* irq26 */
	{0x82, NonHandledInterrupt}, /* irq27 */
	{0x82, NonHandledInterrupt}, /* irq28 */
	{0x82, NonHandledInterrupt}, /* irq29 */
};


///---------in the stm8s_it.c---------
 INTERRUPT_HANDLER(TIM4_UPD_OVF_IRQHandler, 23)
{
 
		 GPIO_WriteReverse(GPIOB,GPIO_PIN_5 );
    TIM4_ClearITPendingBit(TIM4_IT_UPDATE);
}
/*
6)At the end of a file 'main.c' add next function for assert:*/

#ifdef USE_FULL_ASSERT

/**
  * @brief  Reports the name of the source file and the source line number
  *   where the assert_param error has occurred.
  * @param file: pointer to the source file name
  * @param line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t* file, uint32_t line)
{ 
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */

  /* Infinite loop */
  while (1)
  {
  }
}
#endif
