package pl.edu.pw.backend.segment;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SegmentRepository extends CrudRepository<Segment, Integer> {
}
