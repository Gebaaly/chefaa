import { useEffect } from 'react'

export default function ChangeTitle(title) {

  useEffect(() => {
    document.title = title;
  }, [title]);
}
 