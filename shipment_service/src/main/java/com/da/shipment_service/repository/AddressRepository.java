package com.da.shipment_service.repository;

import com.da.shipment_service.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, String> {
    Optional<Address> findByAddressId(String id);
    Optional<List<Address>> findByUserId(String userId);
}
