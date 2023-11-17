package com.example.iot.sensor;

import java.sql.Timestamp;

public class Sensor {
    int id;
    String temperature;
    String humidity;
    String light;
    String dust;
    Timestamp date;

    public Sensor(int id, String temperature, String humidity, String light, String dust, Timestamp date) {
        this.id = id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.dust = dust;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }

    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }

    public String getDust() {
        return dust;
    }

    public void setDust(String dust) {
        this.dust = dust;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
