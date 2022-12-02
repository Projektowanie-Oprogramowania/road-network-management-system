package pl.edu.pw.backend.tariff;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TariffService {

    private final TariffRepository tariffRepository;

    Tariff addTariff(AddTariffDTO tariffDTO) {
        Tariff tariff = TariffMapper.map(tariffDTO);
        return tariffRepository.save(tariff);
    }

    void removeTariff(Long id) {
        tariffRepository.deleteById(id);
    }

    Tariff updateTariff(AddTariffDTO tariffDTO, Long id) {
        Tariff tariff = tariffRepository.findById(id).orElseThrow();
        tariff.setName(tariffDTO.name);
        tariff.setPricesPerKilometer(tariffDTO.pricesPerKilometer);
        return tariffRepository.save(tariff);
    }

    Tariff getTariff(Long id) {
        return tariffRepository.findById(id).orElseThrow();
    }

    List<Tariff> getTariffs() {
        return (List<Tariff>) tariffRepository.findAll();
    }
}
