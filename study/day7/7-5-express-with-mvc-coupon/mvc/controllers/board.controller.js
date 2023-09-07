export class BoardController {
  fetchBoards = (req, res) => {
    const result = [
      { number: 1, writer: "철수", title: "제목없슴", contents: "내용"},
      { number: 2, writer: "영희", title: "제목영희", contents: "영희의 내용"},
      { number: 3, writer: "만두", title: "제목만두", contents: "만두의 내용"},
    ]

    res.send(result)
  }

  createBoard = (req, res) => {
    console.log(req.body.writer)
    console.log(req.body.title)
    console.log(req.body.contents)

    res.send("게시물 등록에 성공하였습니다.")
  }

}