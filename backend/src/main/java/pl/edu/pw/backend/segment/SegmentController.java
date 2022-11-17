package pl.edu.pw.backend.segment;

import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/segments")
class SegmentController {

    private final SegmentService segmentService;

    @GetMapping
    public ResponseEntity<List<SegmentDTO>> getSegments() {
        List<SegmentDTO> segmentsList = segmentService.getSegments().stream()
            .map(SegmentMapper::map).collect(Collectors.toList());
        return ResponseEntity.ok(segmentsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SegmentDTO> getSegment(@PathVariable int id) {
        return ResponseEntity.ok(SegmentMapper.map(segmentService.getSegment(id)));
    }

    @PostMapping
    public ResponseEntity<SegmentDTO> addSegment(@RequestBody AddSegmentDTO addSegmentDTO) {
        Segment segment = segmentService.addSegment(addSegmentDTO);
        return ResponseEntity.ok(SegmentMapper.map(segment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SegmentDTO> updateSegment(@PathVariable int id,
        @RequestBody AddSegmentDTO addSegmentDTO) {
        Segment segment = segmentService.updateSegment(addSegmentDTO, id);
        return ResponseEntity.ok(SegmentMapper.map(segment));
    }

    @DeleteMapping("/{id}")
    public void removeSegment(@PathVariable int id) {
        segmentService.removeSegment(id);
    }


}
