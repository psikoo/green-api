#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT11 Test Initialized");
  dht.begin();
}

void loop() {
  Serial.println(dht.readTemperature());
  delay(2000);
}