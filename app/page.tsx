import { getColors, getModels } from "@/lib/data";
import { SearchForm } from "@/components/search-form";
import Image from "next/image";

export default async function Home() {
  const colors = await getColors();
  const models = await getModels();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-24 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={150} 
          height={50}
        />
      </div>


      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-linear-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      </div>

      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-4">
          Sprawdź dopłatę za kolor
        </h1>
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
          Wybierz system kolorów, model drzwi oraz wpisz kod koloru, aby uzyskać informację o dopłacie.
        </p>
      </div>

      <SearchForm colors={colors} models={models} />
    </main>
  );
}
