package pl.edu.pw.backend.node;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.CREATED;

@RequiredArgsConstructor
@RestController
@RequestMapping("node")
public class NodeController {
    private final NodeService nodeService;

    @PostMapping
    public ResponseEntity<NodeDTO> addNode(
            @RequestBody AddNodeDTO addNodeDTO) {
        Node addedNode = nodeService.addNode(addNodeDTO.toNode());

        return ResponseEntity.status(CREATED)
                .body(AddNodeDTO.fromNode(addedNode));

    }

    @PutMapping
    public ResponseEntity<NodeDTO> updateNode(
            @RequestBody NodeDTO nodeDTO) {
        Node updatedNode = nodeService.updateNode(
                nodeDTO.toNode());
        return ResponseEntity.ok(NodeDTO.fromNode(updatedNode));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeNode(@PathVariable Long id) {
        nodeService.removeNode(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<NodeDTO>> getNode() {
        List<NodeDTO> nodeList = nodeService.getNodeList().stream().map(
                NodeDTO::fromNode).collect(Collectors.toList());
        return ResponseEntity.ok(nodeList);
    }

    @GetMapping("cities")
    public ResponseEntity<List<NodeDTO>> getCities() {
        List<NodeDTO> nodeList = nodeService.getNodeList().stream().map(
                NodeDTO::fromNode).collect(Collectors.toList());

        Predicate<NodeDTO> byCity = node -> node.getIsCity() == true;
        List<NodeDTO> filteredList = nodeList.stream().filter(byCity).collect(Collectors.toList());

        return ResponseEntity.ok(filteredList);
    }

    @GetMapping("/{id}")
    NodeDTO getNode(@PathVariable Long id) {
        return nodeService.getNode(id);
    }
}
