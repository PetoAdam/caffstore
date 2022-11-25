export type Comment = {
  author: string;
  comment: string;
  id: number;
};

export type Caff = {
  id: number;
  name: string;
  date: string;
  file: any;
  uploader: string;
  comments?: Comment[];
  //TODO add comments to backend
};

const mockComment = {
  id: 1,
  author: "senki",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdumtortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittisipsum. Aliquam ultricies a ligula nec faucibus. In elit metus,efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum,mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
};

const mockComment2 = {
  id: 2,
  author: "senki",
  comment:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet. Suspendisse congue vulputate lobortis. Pellentesque at interdumtortor. Quisque arcu quam, malesuada vel mauris et, posuere sagittisipsum. Aliquam ultricies a ligula nec faucibus. In elit metus,efficitur lobortis nisi quis, molestie porttitor metus. Pellentesque et neque risus. Aliquam vulputate, mauris vitae tincidunt interdum,mauris mi vehicula urna, nec feugiat quam lectus vitae ex.",
};

export const caffMock = {
  id: 1,
  name: "caff1",
  date: "2012-12-12T12:11:11",
  file: "https://i.im.ge/2022/11/24/SULXaP.cat-meme-if-it-works-it-aint-stupid-sticker.webp",
  uploader: "asdfg@gmail.com",
  comments: [mockComment, mockComment2],
};

export const caffMock2 = {
  id: 2,
  name: "caff2",
  date: "2012-12-12T12:11:11",
  file: "https://i.im.ge/2022/11/24/SULXaP.cat-meme-if-it-works-it-aint-stupid-sticker.webp",
  uploader: "asdfg@gmail.com",
  comments: [mockComment, mockComment2],
};
