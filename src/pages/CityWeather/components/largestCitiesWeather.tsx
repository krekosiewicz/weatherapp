// src/pages/components/LargestCitiesWeather.tsx
import { use, useState } from 'react'
import styles from './largestCitiesWeather.module.scss'
import { useDispatch } from 'react-redux';
import { setLatestCities } from '@store/weather/weatherSlice.ts';
import { WeatherResponseF } from '@api/weatherApi.types.frontend.ts';
import Dialog from '@/pages/components/dialog/dialog.tsx'

const LargestCitiesWeather = ({ largestCitiesPromise }: { largestCitiesPromise: Promise<WeatherResponseF[]> }) => {
  const data = use(largestCitiesPromise);
  const dispatch = useDispatch();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  if (data && data.length) {
    dispatch(setLatestCities(data));
  }

  return (
    <>
      <div className={styles.navigation}>
        <div className={'appButton'} onClick={openDialog}>Porównaj pogodę z innymi miastami</div>
      </div>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <h2>Dialog Title</h2>
        <p>This is the dialog content. You can put any React component here.sdsadasd asd asdasd asd asdsadasd asd </p>
      </Dialog>
    </>
  );
};

export default LargestCitiesWeather;