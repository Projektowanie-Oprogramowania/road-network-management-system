package pl.edu.pw.backend.node;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddNodeDTO {
    Boolean isCity;
    String name;
    double x;
    double y;

    public Node toNode() {
        return new Node(isCity, name, x, y);
    }

    public static NodeDTO fromNode(Node node) {
        return new NodeDTO(node.getId(), node.getIsCity(), node.getName(), node.getX(), node.getY());
    }
}
