package pl.edu.pw.backend.region;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("region")
public class RegionController {

    private final RegionService regionService;

    @GetMapping
    public List<RegionDTO> getRegions() {
        return regionService.getRegions();
    }
}
