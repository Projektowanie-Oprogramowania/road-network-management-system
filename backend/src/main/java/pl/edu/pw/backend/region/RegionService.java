package pl.edu.pw.backend.region;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionRepository regionRepository;

    public List<RegionDTO> getRegions() {
        return regionRepository.findAll().stream()
            .map(RegionMapper::map)
            .collect(Collectors.toList());
    }

}
