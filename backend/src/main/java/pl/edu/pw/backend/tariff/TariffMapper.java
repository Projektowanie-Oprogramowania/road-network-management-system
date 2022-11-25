package pl.edu.pw.backend.tariff;

import java.util.Date;

public class TariffMapper {
    private TariffMapper() {}

    public static TariffDTO map(Tariff tariff) {
        return new TariffDTO(tariff.getId(), tariff.getName(), tariff.getPricesPerKilometer());
    }

    public static Tariff map(AddTariffDTO tariffDTO) {
        return new Tariff(new Date(System.currentTimeMillis()), tariffDTO.name, tariffDTO.pricesPerKilometer);
    }
}
