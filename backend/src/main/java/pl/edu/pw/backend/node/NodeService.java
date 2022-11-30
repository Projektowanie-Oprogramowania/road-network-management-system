package pl.edu.pw.backend.node;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeService {
    @Autowired
    private NodeRepository nodeRepository;

    Node addNode(Node node) {
        return nodeRepository.save(node);
    }

    Node updateNode(Node node) {
        return nodeRepository.findById(node.getId()).orElseThrow();
    }

    void removeNode(Long id) {
        nodeRepository.deleteById(id);
    }

    List<Node> getNodeList() {
        return nodeRepository.findAll();
    }

    public NodeDTO getNode(Long id) {
        Node node = nodeRepository.findById(id).orElseThrow();
        return NodeDTO.fromNode(node);
    }
}
