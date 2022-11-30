package pl.edu.pw.backend.charge;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public
interface ChargeRepository extends JpaRepository<Charge, Integer> {
    List<Charge> findAllByUserID(Integer userID);
}