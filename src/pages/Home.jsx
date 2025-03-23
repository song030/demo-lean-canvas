import CanvasList from "../components/CanvasList";
import SearchBar from "../components/SearchBar";
import ViewToggle from "../components/ViewToggle";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Button from "../components/Button";

import { useState } from "react";
import { createCanvas, deleteCanvas, getCanvases } from "../api/canvas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CategoryFilter from "../components/CategoryFilter";

function Home() {
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });

  const handleFilter = (key, value) =>
    setFilter({
      ...filter,
      [key]: value,
    });

  const [isGridView, setIsGridView] = useState(true);

  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["canvases", filter.searchText, filter.category],
    queryFn: () => {
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      });
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () =>
      queryClient.invalidateQueries(["canvases", filter.searchText]),
    onError: (err) => alert(err.message),
  });

  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () =>
      queryClient.invalidateQueries(["canvases", filter.searchText]),
    onError: (err) => alert(err.message),
  });

  const handleDeleteItem = async (id) => {
    // if (confirm("삭제 하시겠습니까?") === false) {
    //   return;
    // }
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.earchText}
            onSearch={(val) => handleFilter("searchText", val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={(val) => handleFilter("category", val)}
          />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="flex justify-end mb-6">
        <Button loading={isLoadingCreate} onClick={handleCreateCanvas}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredDate={data}
          searchText={filter.searchText}
          isGridView={isGridView}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </>
  );
}

export default Home;
