package com.ljd.trafficSignal.state;

public enum TrafficLightState {
    Red {
        @Override
        public TrafficLightState nextState() {
            return Green;
        }
    },
    Yellow  {
        @Override
        public TrafficLightState nextState() {
            return Red;
        }
    },
    Green  {
        @Override
        public TrafficLightState nextState() {
            return Yellow;
        }
    };

    public abstract TrafficLightState nextState();
}
