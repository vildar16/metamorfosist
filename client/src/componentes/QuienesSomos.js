import React from 'react';
import Style from './../css/Style-QuienesSomos.css';
import Image from '../images/metamorfosis.jpg'
class QuienesSomos extends React.Component {
    render() {

        return (
            <div>
                <div>
                    <div id="fondoQuienes">
                        <h1>¿Quiénes somos?</h1>
                    </div>
                    <div class="aporteLeft_QuienesSomos">
                        <div id="FotoQuienesSomos"> </div>
                    </div>
                    <div class="aporteRight_QuienesSomos">
                        <div class="textoAporte">
                            Senior Ecologist
                    <br /><br />
                    Nature Glenelg Trust
                    <br /><br />
                    Greg Kerr es un ecologista que actualmente trabaja como ecologista senior en la organización sin fines de lucro Nature Glenelg Trust para restaurar los humedales en el oeste de Victoria. Greg está gestionando la restauración de un extenso complejo de humedales en el delta de Wannon en la base de los Grampians. Él está desarrollando soluciones para la restauración de humedales siguiendo el impacto de las plantaciones de goma azul en toda el área, incluidos enfoques innovadores para los herbívoros sobreabundantes y su impacto en los programas de revegetación, diseñando e implementando programas de monitoreo, fomentando la conciencia ambiental, involucrando la participación de la comunidad y los indígenas en el sitio y redacción de planes de gestión.
                    <br /><br />
                    Anteriormente, Greg fue ecólogo regional para la península de Eyre en el Departamento de Medio Ambiente, Agua y Recursos Naturales de Australia del Sur. Greg ha adquirido una amplia experiencia en el manejo de la fauna, los humedales y arroyos y la ciencia ciudadana a través de investigaciones ecológicas y diseño de programas en Victoria, Nueva Gales del Sur, Australia del Sur, Australia Occidental, Zimbabwe, Etiopía, Fiji y China. Ha trabajado extensamente en la enseñanza y la comunicación de las ciencias y ha desarrollado e implementado una variedad de proyectos de ciencia ciudadana. Greg también edita la revista Stilt del Australasian Wader Studies Group.
                    </div>
                    </div>
                </div>

                <footer id="footerAbsolute">
                    <div>Proyecto Metamorfosis</div>
                    <div>Versión 1.2 por Metamorfosis en Instituto Tecnológico de Costa Rica</div>
                    <div>Semestre II de 2020. Administración de Proyectos</div>
                </footer>

            </div>
        );
    }
}

export default QuienesSomos;
