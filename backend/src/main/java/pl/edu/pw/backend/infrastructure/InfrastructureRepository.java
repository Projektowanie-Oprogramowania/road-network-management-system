package pl.edu.pw.backend.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
interface InfrastructureRepository extends JpaRepository<Infrastructure, Long> {

}
