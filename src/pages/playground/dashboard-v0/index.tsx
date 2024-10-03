import { useBoolean } from "usehooks-ts";
import { Typography } from "@/components/ui";
import { Sidebar } from "./sidebar";
import { cn } from "@/utils";
import { Navbar } from "./navbar";

export function EdustDashboard() {
  const { value: isOpen, toggle } = useBoolean(true);

  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggle} />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Navbar title={"Dashboard"} />
        <div className="px-4 pb-6 pt-6 sm:px-6">
          <Typography variant="h2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            laborum quae cumque eligendi explicabo omnis aliquam. Nulla magni
            alias ex ipsam corporis, repellendus quas eum. Quibusdam
            perspiciatis fugiat, alias dolorem exercitationem ipsam voluptatem
            natus magnam nulla quos iste tempore veniam! Illo iusto laborum
            obcaecati corporis expedita optio deleniti, iure repudiandae dolore
            voluptas magnam nam commodi voluptatibus, quod doloribus voluptate
            ullam accusamus perspiciatis? Illo dolorem eos commodi veniam magnam
            blanditiis numquam! Quos veritatis amet suscipit sit facere officia
            quia beatae voluptates at quae, quibusdam labore incidunt, eum
            expedita ratione, eligendi perspiciatis modi harum. Voluptas
            pariatur in quos fugit accusamus fugiat dolorem quis ipsum iusto
            eaque inventore quasi repellat sunt id facere eligendi vitae dolore,
            voluptatibus perferendis? Rerum perferendis quos quas dolorum quasi
            voluptates corrupti repellat quod, aliquid placeat eos non
            laudantium est incidunt? Recusandae officiis error, illo dignissimos
            neque soluta cum saepe sed eligendi placeat sit sint, incidunt
            quisquam, quos dolores explicabo mollitia nulla magni quam iure!
            Officia consectetur quidem inventore eligendi sint quae quisquam ad
            dignissimos. Est porro quo debitis expedita quisquam quasi quae
            possimus fugit corporis fuga rem, dignissimos totam aut molestiae
            vero placeat dolor minus consectetur! Accusantium debitis sunt
            consequatur, assumenda placeat quod nam? Odio, ipsa sunt? Officiis
            odio sunt voluptatem molestias, repudiandae obcaecati beatae minima.
            A, animi eaque doloribus odit quae nesciunt itaque nihil dolore
            necessitatibus. Molestiae quaerat tempore modi rem esse voluptate
            repudiandae similique! Ullam eum quam soluta nemo autem, cupiditate
            dolorem quo quas, reprehenderit, error laboriosam! Aperiam sit quae
            enim illum eum consectetur temporibus. Minus officiis optio sequi
            totam ab magni aspernatur facilis? Laboriosam deserunt ipsa, vel
            voluptate vitae, at dicta facilis laborum repellendus, iusto quis
            quisquam quam accusamus! Nihil sit expedita ratione inventore,
            fugiat iure, asperiores natus dolore voluptates vero similique id ad
            aspernatur facere numquam? At exercitationem unde magnam iusto
            aliquam eum saepe ex enim nihil, blanditiis fuga voluptatem
            doloribus, praesentium cum ipsum corporis animi consequatur quisquam
            beatae fugiat velit? Unde nulla, deserunt possimus delectus impedit
            dolorem voluptatum odit, corrupti cumque, sit dolorum cupiditate
            praesentium doloribus provident? Ad, maiores voluptas obcaecati
            voluptates, culpa error odio vero non expedita praesentium fuga
            libero dignissimos aut assumenda at explicabo? Eligendi ad, quod
            magnam dolorem alias est voluptas temporibus nisi a, officia
            corporis hic ratione? Impedit eveniet nulla qui ratione nam, maiores
            maxime vitae doloribus sapiente rem quia nihil ipsa exercitationem
            non? Debitis, amet sequi in vitae adipisci nisi sunt laboriosam
            maiores, odit facere, accusamus magni sapiente dolores! In,
            asperiores doloribus. Vero provident cupiditate omnis explicabo
            expedita saepe, maiores neque laborum dicta. Facilis eum quos
            doloremque numquam! Quo facere beatae quae accusamus pariatur.
            Inventore dolore eius odio nobis quo. Necessitatibus quia
            dignissimos, molestias nobis quam tempora maxime beatae accusamus
            eveniet quo corrupti soluta error perspiciatis explicabo. Aut
            maiores facilis saepe odio quod fuga omnis rerum nemo, facere
            accusamus. Corrupti explicabo vel quos ratione est, necessitatibus
            quis, sequi voluptatibus porro voluptatum accusantium eum doloremque
            cupiditate molestiae inventore at. Id consectetur dolore tempora
            delectus repudiandae a harum nesciunt itaque. Aut est accusamus
            sapiente, laboriosam architecto voluptatum quae aliquam iusto!
          </Typography>
        </div>
      </main>
    </>
  );
}

export default EdustDashboard;
