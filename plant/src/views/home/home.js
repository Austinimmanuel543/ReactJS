import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeroSlider } from '../../components/heroSlider/heroSlider';
import { ItemListContainer } from '../../components/itemListContainer/itemListContainer';
import slide from "../../assets/slide.jpg";

export const Home = () => {
    return (
        <div id="home">
            
            <HeroSlider
                tittle="plant mangement system"
                subtittle="An organizational unit serving to subdivide an enterprise according to production, procurement, maintenance, and materials planning aspects."
                
                 img={slide} />

            <ItemListContainer
                greeting="A plant is a living thing that grows in the earth!"
                tittle="plant in main for earth"
                anchor="trends"
            />

            <ItemListContainer
                greeting=" "
                tittle="Novedades"
                anchor="new"
            />
        </div>
    )
}