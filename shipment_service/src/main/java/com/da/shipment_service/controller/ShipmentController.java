package com.da.shipment_service.controller;

import com.da.shipment_service.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shipment")
@RequiredArgsConstructor
public class ShipmentController {
    private final ShipmentService shipmentService;


}
