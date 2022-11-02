package pl.edu.pw.backend.infrastructure;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.Point;


@Data
@NoArgsConstructor
@AllArgsConstructor
class Infrastructure {
    private String name;
    private Point location;
    private InfrastructureType type;
}
