import React, { useEffect, useCallback, useState } from 'react';
import Head from 'next/head';
import { InferGetStaticPropsType } from 'next';
import { ISneaker } from '../@types/cart/Cart';
import Sneakers from '../components/Sneakers';

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3000/api/sneakers')
  const sneakerList: ISneaker[] = (await res.json()).results;

  return {
    props: {
      sneakerList,
    },
  }
}

export default function Home({ sneakerList }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState<string>('');

  const [sneakerListClone, setSneakerListClone] = useState<ISneaker[]>([]);

  useEffect(() => {
    setSneakerListClone(sneakerList);
  }, [sneakerList]);

  // Deals with the search bar filtering
  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      const filteredSneakers = sneakerList.filter(sneaker =>
        sneaker.description
          .toLowerCase()
          .includes(value.length > 0 ? value.toLocaleLowerCase() : ''),
      );
      setSneakerListClone(filteredSneakers);
    }, [sneakerList, sneakerListClone],
  );

  return (
    <>
      <Head>
        <title>Catalog - Trustly Frontend Challenge</title>
      </Head>

      <main>
        <Sneakers
          sneakerList={sneakerList}
          searchValue={searchValue}
          onChangeSearchValue={(searchValue) => handleSearchChange(searchValue)}
        />
      </main>
    </>
  )
}
