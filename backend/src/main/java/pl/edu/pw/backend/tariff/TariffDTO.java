package pl.edu.pw.backend.tariff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TariffDTO {
    Long id;
    String name;
    Map<VehicleCategory, Double> pricesPerKilometer;
}
