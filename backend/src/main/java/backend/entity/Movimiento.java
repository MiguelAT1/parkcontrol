package backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimientos")
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipoMovimiento;
    private LocalDateTime fechaHora;

    @ManyToOne
    @JoinColumn(name = "auto_id")
    private Auto auto;

    public Movimiento() {
    }

    public Movimiento(Long id, String tipoMovimiento, LocalDateTime fechaHora, Auto auto) {
        this.id = id;
        this.tipoMovimiento = tipoMovimiento;
        this.fechaHora = fechaHora;
        this.auto = auto;
    }

    public Long getId() {
        return id;
    }

    public String getTipoMovimiento() {
        return tipoMovimiento;
    }

    public void setTipoMovimiento(String tipoMovimiento) {
        this.tipoMovimiento = tipoMovimiento;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public Auto getAuto() {
        return auto;
    }

    public void setAuto(Auto auto) {
        this.auto = auto;
    }
}