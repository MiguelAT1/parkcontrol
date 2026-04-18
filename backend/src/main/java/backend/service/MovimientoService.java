package backend.service;

import backend.entity.Auto;
import backend.entity.Movimiento;
import backend.entity.Usuario;
import backend.repository.AutoRepository;
import backend.repository.MovimientoRepository;
import backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final AutoRepository autoRepository;
    private final UsuarioRepository usuarioRepository;

    private static final int CAPACIDAD_MAXIMA = 40;

    public MovimientoService(MovimientoRepository movimientoRepository,
                             AutoRepository autoRepository,
                             UsuarioRepository usuarioRepository) {
        this.movimientoRepository = movimientoRepository;
        this.autoRepository = autoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Movimiento> listarMovimientos() {
        return movimientoRepository.findAll();
    }

    public long contarAutosDentro() {
        return autoRepository.countByActivoTrue();
    }

    public long espaciosDisponibles() {
        return CAPACIDAD_MAXIMA - contarAutosDentro();
    }

    public String registrarEntrada(Long autoId) {
        Auto auto = autoRepository.findById(autoId).orElse(null);

        if (auto == null) {
            return "Auto no encontrado";
        }

        if (Boolean.TRUE.equals(auto.getActivo())) {
            return "El auto ya se encuentra dentro de la cochera";
        }

        if (contarAutosDentro() >= CAPACIDAD_MAXIMA) {
            return "No hay espacios disponibles en la cochera";
        }

        auto.setActivo(true);
        autoRepository.save(auto);

        Movimiento movimiento = new Movimiento();
        movimiento.setAuto(auto);
        movimiento.setTipoMovimiento("ENTRADA");
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);

        return "Entrada registrada correctamente";
    }

    public String registrarSalida(Long autoId) {
        Auto auto = autoRepository.findById(autoId).orElse(null);

        if (auto == null) {
            return "Auto no encontrado";
        }

        if (!Boolean.TRUE.equals(auto.getActivo())) {
            return "El auto no se encuentra dentro de la cochera";
        }

        auto.setActivo(false);
        autoRepository.save(auto);

        Usuario usuario = auto.getUsuario();
        if (usuario != null) {
            if (usuario.getVisitas() == null) {
                usuario.setVisitas(0);
            }

            usuario.setVisitas(usuario.getVisitas() + 1);

            if (usuario.getVisitas() >= 60) {
                usuario.setPromocion("Promoción Premium");
            } else if (usuario.getVisitas() >= 40) {
                usuario.setPromocion("Promoción Frecuente");
            } else if (usuario.getVisitas() >= 20) {
                usuario.setPromocion("Promoción Básica");
            } else {
                usuario.setPromocion("Sin promoción");
            }

            usuarioRepository.save(usuario);
        }

        Movimiento movimiento = new Movimiento();
        movimiento.setAuto(auto);
        movimiento.setTipoMovimiento("SALIDA");
        movimiento.setFechaHora(LocalDateTime.now());
        movimientoRepository.save(movimiento);

        return "Salida registrada correctamente";
    }
}