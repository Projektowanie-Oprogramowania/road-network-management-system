package pl.edu.pw.backend.tariff;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tariff")
class TariffController {

    private final TariffService tariffService;

    @PutMapping("/{id}")
    public ResponseEntity<TariffDTO> updateTariff(@PathVariable Long id,
                                                    @RequestBody AddTariffDTO tariffDTO) {
        Tariff tariff = tariffService.updateTariff(tariffDTO, id);
        return ResponseEntity.ok(TariffMapper.map(tariff));
    }

    @GetMapping
    public ResponseEntity<List<TariffDTO>> getTariffs() {
        List<TariffDTO> tariffs = tariffService.getTariffs().stream()
                .map(TariffMapper::map).collect(Collectors.toList());
        return ResponseEntity.ok(tariffs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TariffDTO> getTariff(@PathVariable Long id) {
        return ResponseEntity.ok(TariffMapper.map(tariffService.getTariff(id)));
    }

    @PostMapping
    public ResponseEntity<TariffDTO> addTariff(@RequestBody AddTariffDTO tariffDTO) {
        Tariff tariff = tariffService.addTariff(tariffDTO);
        return ResponseEntity.ok(TariffMapper.map(tariff));
    }

    @DeleteMapping("/{id}")
    public void removeTariff(@PathVariable Long id) {
        tariffService.removeTariff(id);
    }
}
