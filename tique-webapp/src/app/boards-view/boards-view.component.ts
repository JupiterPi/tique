import { Component } from '@angular/core';

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.css']
})
export class BoardsViewComponent {
  boards = [
    {
      name: "Board 1",
      progress: 1,
      tags: [
        {
          name: "Tag 1",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        }
      ]
    },
    {
      name: "Board 2",
      progress: 2,
      tags: [
        {
          name: "Tag 2",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "Tag 3",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        }
      ]
    },
    {
      name: "Board 3",
      progress: 3,
      tags: [
        {
          name: "Tag 1",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "Tag 3",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        }
      ]
    },
    {
      name: "Board 4",
      progress: 4,
      tags: [
        {
          name: "Tag 1",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "Tag 2",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        },
        {
          name: "Tag 3",
          icon: "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
        }
      ]
    }
  ];
}
