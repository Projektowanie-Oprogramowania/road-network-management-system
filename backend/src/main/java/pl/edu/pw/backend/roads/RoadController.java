package pl.edu.pw.backend.roads;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/{id}")
    public ResponseEntity<RoadDTO> updateRoad(@RequestBody AddRoad roadDTO, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(roadService.updateRoad(roadDTO, id));
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
