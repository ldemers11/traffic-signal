package com.ljd.trafficSignal.websocket;

import java.util.concurrent.ThreadLocalRandom;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.ljd.trafficSignal.state.TrafficLightState;

 
@Service
public class ScheduledSignal {
    
    private final static Logger logger = Logger.getLogger(ScheduledSignal.class.getName());

    private final static int SECONDS_TO_MILLISECONDS = 1000;

    @Autowired
    private SimpMessagingTemplate template;

    @Async("threadPoolTaskExecutor")
    public void sendMessages() {

        TrafficLightState state = TrafficLightState.Red;

        while (true) {
            int randomTime = ThreadLocalRandom.current().nextInt(3, 10 + 1);
            try {
                logger.info("waiting: " + randomTime);
                Thread.sleep(randomTime * SECONDS_TO_MILLISECONDS);
                state = state.nextState();
                logger.info("state: " + state.toString());
                this.template.convertAndSend("/all/messages", state.toString());

            } catch (InterruptedException e) {
                logger.log(Level.SEVERE, "an exception was thrown while waiting to send next signal", e);
            }
        }

    }

    @EventListener(ApplicationReadyEvent.class)
    public void startMessages() {
        logger.info("Starting to send messages");
        this.sendMessages();
        logger.info("Finished sendMessages");

    }
}
