package com.dreams.demo.invoice.service.mapper;

import com.dreams.demo.invoice.domain.*;
import com.dreams.demo.invoice.service.dto.ShipmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Shipment} and its DTO {@link ShipmentDTO}.
 */
@Mapper(componentModel = "spring", uses = {InvoiceMapper.class})
public interface ShipmentMapper extends EntityMapper<ShipmentDTO, Shipment> {

    @Mapping(source = "invoice.id", target = "invoiceId")
    @Mapping(source = "invoice.code", target = "invoiceCode")
    ShipmentDTO toDto(Shipment shipment);

    @Mapping(source = "invoiceId", target = "invoice")
    Shipment toEntity(ShipmentDTO shipmentDTO);

    default Shipment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Shipment shipment = new Shipment();
        shipment.setId(id);
        return shipment;
    }
}
