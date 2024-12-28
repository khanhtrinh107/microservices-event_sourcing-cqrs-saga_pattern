package com.da.shipment_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AddressRequest {
    private String userId;
    private String city;
    private String province;
    private String detailAddress;
}
