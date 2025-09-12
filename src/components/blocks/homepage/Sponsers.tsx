import useTableData from "@/hooks/useTableData";
import { Container } from "@/components/blocks/layout/Container";
import { MasonryGrid } from "@/components/blocks/layout/MasonryGrid";
import { SponserCard } from "@/components/blocks/cards/SponserCard";
import { ProfileCard } from "@/components/blocks/cards/ProfileCard";
import sponsersBackgroundImage from "@/assets/sponsers_background.png";

export function SponserSection() {
  const {
    data: sponsers,
    isLoading: tableDataLoading,
    error: tableDataError,
  } = useTableData("krs_sponser_data");
  return (
    <Container as="section" className="sponsers_container">
      <Container
        wide
        className="header_container relative bg-[#FFE1BA] pt-15 pb-20 -mb-15 z-2 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)] w-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 z-1"
          style={{
            backgroundImage: `url(${sponsersBackgroundImage})`,
          }}
        />
        <h1 className="text-black text-center mb-4">Our Sponsors</h1>
        <h4 className="mb-4 text-center">
          અમે અમારા પ્રાયોજકોના તમામ સમર્થન માટે આભારી છીએ!
        </h4>
      </Container>
      {/* Swiper Section */}
      <div className="right_container min-w-0 z-3 relative px-4">
        {tableDataLoading && <p>Loading...</p>}
        {tableDataError && (
          <p>Ooops..!! We are Facing Some issue. Please Try Again later.</p>
        )}

        {!tableDataLoading &&
          !tableDataError &&
          sponsers &&
          sponsers.length > 0 && (
            <MasonryGrid>
              {sponsers?.map((sponser: any) =>
                sponser.type == "company" ? (
                  <SponserCard
                    {...sponser}
                    key={sponser.id}
                    bucket="krs-homepage-assets"
                    imagePath={`sponsers/${sponser.image_path}`}
                  />
                ) : (
                  <ProfileCard
                    variant="wide"
                    {...sponser}
                    bucket="krs-homepage-assets"
                    imagePath={`sponsers/${sponser.image_path}`}
                    key={sponser.id}
                  />
                )
              )}
              {/* Add more cards */}
            </MasonryGrid>
          )}
      </div>
    </Container>
  );
}
