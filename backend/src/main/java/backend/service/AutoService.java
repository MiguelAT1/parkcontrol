package backend.service;

import backend.entity.Auto;
import backend.entity.Usuario;
import backend.repository.AutoRepository;
import backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AutoService {

    private final AutoRepository autoRepository;
    private final UsuarioRepository usuarioRepository;

    public AutoService(AutoRepository autoRepository, UsuarioRepository usuarioRepository) {
        this.autoRepository = autoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Auto> listarAutos() {
        return autoRepository.findAll();
    }

    public Auto guardarAuto(Auto auto, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);

        if (usuario != null) {
            auto.setUsuario(usuario);
            auto.setActivo(false);
            return autoRepository.save(auto);
        }

        return null;
    }

    public Auto obtenerPorId(Long id) {
        return autoRepository.findById(id).orElse(null);
    }

    public Auto actualizarAuto(Long id, Auto datos) {
        Auto auto = autoRepository.findById(id).orElse(null);

        if (auto != null) {
            auto.setPlaca(datos.getPlaca());
            auto.setMarca(datos.getMarca());
            auto.setModelo(datos.getModelo());
            auto.setColor(datos.getColor());
            return autoRepository.save(auto);
        }

        return null;
    }

    public boolean eliminarAuto(Long id) {
        if (autoRepository.existsById(id)) {
            autoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}