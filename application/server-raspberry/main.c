//Carrega as bibliotecas
#include "EmonLib.h" 
EnergyMonitor emon1; 
EnergyMonitor emon2; 

int rede = 125.4;
int pino_tomadas = 0;
int pino_lampadas = 1;
double kwhTotal_Acc, kwhTotal_Acc2;
unsigned long ltmillis, tmillis, timems, timeaux;

void setup() {

    Serial.begin(9600);
    emon1.current(pino_tomadas, 60.2); //Pino, calibracao      
    emon2.current(pino_lampadas, 60.2); //Pino, calibracao

}

void loop() {
    // Calcula quantidade de tempo desde a última measurment realpower.
    ltmillis = tmillis;
    tmillis = millis();       
    timems = tmillis - ltmillis;
    double Irms = emon1.calcIrms(1480); // Calculate Irms
    double Irms2 = emon2.calcIrms(1480); // Calculate Irms
    double kwhTemp2, kwhTemp;
    if (Irms > 0.3 || Irms2 > 0.3) {

        if (Irms > 0.3) {
            kwhTemp = (((Irms*127.0)/1000.0) * 1.0/3600.0 * (timems/1000.0));            
        }

        if (Irms2 > 0.3) {
            kwhTemp2 = (((Irms2*127.0)/1000.0) * 1.0/3600.0 * (timems/1000.0));            
        }

        Serial.print("0:");
        Serial.print(kwhTemp, 10);
        Serial.print(",1:");
        Serial.print(kwhTemp2, 10);
        Serial.println("");       

    } else {

        Serial.print("0:");
        Serial.print(kwhTemp, 10);
        Serial.print(",1:");
        Serial.print(kwhTemp2, 10);
        Serial.println("");                                         
    }    

    delay(480);
}

