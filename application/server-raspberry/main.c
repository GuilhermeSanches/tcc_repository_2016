//Carrega as bibliotecas
#include "EmonLib.h"

//instancia biblioteca para leitura da corrente 
EnergyMonitor emon1; 
EnergyMonitor emon2; 

//variáveis globais
int rede = 125.4;
int pino_tomadas = 0;
int pino_lampadas = 1;
unsigned long ltmillis, tmillis, timems, timeaux;

void setup() {

    Serial.begin(9600);
    emon1.current(pino_tomadas, 60.2); //Pino, calibracao      
    emon2.current(pino_lampadas, 60.2); //Pino, calibracao

}

void loop() {
    // Calcula quantidade de tempo desde a última mensuração.
    ltmillis = tmillis;
    tmillis = millis();       
    timems = tmillis - ltmillis;

    double Irms = emon1.calcIrms(1480); // Cálculo da corrente do sensor_1
    double Irms2 = emon2.calcIrms(1480); // Cálculo da corrente do sensor_2
    double kwhTemp2 = 0.0, kwhTemp = 0.0; //variaveis temporarias para valores em quillowatts/hora

    //caso nao exista nenhum fio para medir, o sensor le um valor inválido entre 0 a 0.3A
    if (Irms > 0.3 || Irms2 > 0.3) {

        if (Irms > 0.3) {
            //transformação do valor lido em amperes para quilowatts/hora do primeiro sensor
            kwhTemp = (((Irms*127.0)/1000.0) * 1.0/3600.0 * (timems/1000.0));            
        }

        if (Irms2 > 0.3) {
            //transformação do valor lido em amperes para quilowatts/hora do segundo sensor
            kwhTemp2 = (((Irms2*127.0)/1000.0) * 1.0/3600.0 * (timems/1000.0));            
        }

        //impressão em formato sensor_1:valor_1,sensor_2:valor_2
        Serial.print("0:");
        Serial.print(kwhTemp, 10);
        Serial.print(",1:");
        Serial.print(kwhTemp2, 10);
        Serial.println("");       

    } else {
        //impressão em formato sensor_1:valor_1,sensor_2:valor_2
        Serial.print("0:");
        Serial.print(kwhTemp, 10);
        Serial.print(",1:");
        Serial.print(kwhTemp2, 10);
        Serial.println("");                                         
    }    

    delay(480);
}

