package pl.edu.pw.backend.roads;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.segment.SegmentDTO;

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

    @GetMapping
    List<RoadDTO> getRoads() {
        return roadService.getRoads();
    }

    @GetMapping("/{id}/points")
    List<PointDTO> getRoadPoints(@PathVariable int id) {
        RoadDTO road = roadService.getRoad(id);
        List<PointDTO> points = new ArrayList<>(Arrays.asList(road.startingPoint, road.endingPoint));

        for (SegmentDTO s : road.getSegments()) {
            System.out.println(s.getPoints());
            points.addAll(s.getPoints());
        }

        return points;
    }
}
