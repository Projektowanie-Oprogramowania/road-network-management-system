package pl.edu.pw.backend.roads;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("road")
public class RoadController {
    private final RoadService roadService;

    @PostMapping
    ResponseEntity<RoadDTO> addRoad(@RequestBody AddRoad addRoad) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roadService.addRoad(addRoad));
    }

    @PutMapping
    public ResponseEntity<RoadDTO> updateRoad(@RequestBody RoadDTO roadDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(roadService.updateRoads(roadDTO));
    }

    @DeleteMapping("/{id}")
    void removeRoad(@PathVariable int id) {
        roadService.removeRoad(id);
    }

    @GetMapping("/{id}")
    RoadDTO getRoad(@PathVariable int id) {
        return roadService.getRoad(id);
    }

    @GetMapping("/region/{id}")
    List<RoadDTO> getRoadByRegion(@PathVariable int id) {
        return roadService.getRoadsByRegion(id);
    }

}
