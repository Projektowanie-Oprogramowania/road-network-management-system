package pl.edu.pw.backend.point;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.CREATED;

@RequiredArgsConstructor
@RestController
@RequestMapping("point")
public class PointController {
    private final PointService pointService;

    @PostMapping
    public ResponseEntity<PointDTO> addPoint(
            @RequestBody AddPointDTO addPointDTO) {

        Point addedPoint = pointService.addPoint(addPointDTO.toPoint());

        return ResponseEntity.status(CREATED)
                .body(AddPointDTO.fromPoint(addedPoint));

    }

    @PutMapping
    public ResponseEntity<PointDTO> updatePoint(
            @RequestBody PointDTO pointDTO) {
        Point updatedPoint = pointService.updatePoint(
                pointDTO.toFullPoint());
        return ResponseEntity.ok(PointDTO.fromPoint(updatedPoint));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removePoint(@PathVariable Long id) {
        pointService.removePoint(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<PointDTO>> getPoint() {
        List<PointDTO> pointList = pointService.getPointList().stream().map(
                PointDTO::fromPoint).collect(Collectors.toList());
        return ResponseEntity.ok(pointList);
    }

    @GetMapping("/{id}")
    PointDTO getPoint(@PathVariable Long id) {
        return pointService.getPoint(id);
    }

    @GetMapping("/cities")
    public ResponseEntity<List<PointDTO>> getPointsByCities() {
        List<PointDTO> pointList = pointService.getPointList().stream().map(
                PointDTO::fromPoint).collect(Collectors.toList());

        Predicate<PointDTO> byCity = point -> point.getName() != "" && point.getName() != null;
        List<PointDTO> filteredList = pointList.stream().filter(byCity).collect(Collectors.toList());

        return ResponseEntity.ok(filteredList);
    }
}
