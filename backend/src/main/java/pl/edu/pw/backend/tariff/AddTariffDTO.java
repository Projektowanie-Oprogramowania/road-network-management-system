package pl.edu.pw.backend.tariff;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddTariffDTO {
    String name;
    Map<VehicleCategory, Double> pricesPerKilometer;
}
