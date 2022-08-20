import Show from "@/models/Show";
import WrapperLike from "@vue/test-utils/dist/interfaces/wrapperLike";

export const makeSampleShow = function (
  seed: string,
  genres: Array<string>
): Show {
  return {
    id: `test_show_id_${seed}`,
    url: `https://testhost/shows/test_show_id_${seed}`,
    name: `test show name ${seed}`,
    type: "test_show_type",
    language: "test_show_language",
    genres: genres,
    status: `test_status_${seed}`,
    runtime: 1234,
    averageRuntime: 12345,
    premiered: `test_premiered_date_${seed}`,
    ended: `test_ended_date_${seed}`,
    image: {
      medium: `https://testhost/images/test_show_id_${seed}/images/medium.jpg`,
      original: `https://testhost/images/test_show_id_${seed}/images/original.jpg`,
    },
  };
};

/**
 * Finds element in the Vue Wrapper based on data-test-id attribute.
 * @param wrapper Vue Wrapper on which the element is to be found.
 * @param id Expected value of the data-test-id attribute.
 * @returns Element if found.
 */
export const findElementByTestId = function (
  wrapper: WrapperLike,
  id: string
): WrapperLike {
  return wrapper.find(`[data-test-id="${id}"]`);
};
