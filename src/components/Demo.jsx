import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

function Demo() {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  })

  const [allArticles, setAllArticles] = useState([])
  const [isCopied, setIsCopied] = useState(false)

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    setAllArticles(JSON.parse(localStorage.getItem('articles')))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data } = await getSummary({ articleUrl: article.url })
    const newArticle = { ...article, summary: data.summary }
    const updatedArticlesList = [newArticle, ...allArticles]

    setArticle(newArticle)
    setAllArticles(updatedArticlesList)

    localStorage.setItem('articles', JSON.stringify(updatedArticlesList))
  }

  const handleCopy = (url) => {
    setIsCopied(true)
    navigator.clipboard.writeText(url)
    setTimeout(() => setIsCopied(false), 1000)
  }

  const removeFromStorage = (index) => {
    const removeEl = allArticles.filter((item, i) => i !== index)
    // console.log(removeEl, allArticles);
    
    setAllArticles(removeEl)
    localStorage.setItem('articles', JSON.stringify(removeEl))
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form action="" className="relative flex justify-center items-center" onSubmit={handleSubmit}>
          <img src={linkIcon} alt="link_icon" className='absolute left-0 my-2 ml-3 w-5' />

          <input type="url" placeholder='Enter a URL' value={article.url} onChange={(e) => setArticle({ ...article, url: e.target.value })} required className='url_input peer' />

          <button type='submit' className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'><i class="fa-solid fa-circle-right"></i></button>
        </form>

        {/* Browse URL History */}
        {allArticles && (
          <div className='flex flex-col gap-1 max-h-60'>
            {allArticles.map((item, index) => (
              <div key={index} className='link_card' onClick={() => setArticle(item)}>
                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                  <img src={isCopied ? tick : copy} alt="copy" />
                </div>

                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm'>
                  {item.url}
                </p>

                <i class="fa-regular fa-circle-xmark text-gray-400 text-[18px]" onClick={() => removeFromStorage(index)}></i>
              </div>
            ))}
          </div>
        )}
        
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {
          isFetching ? (
            <img src={loader} alt="loader" className='w-20 h-20' />
          ) : error ? (
            <p className='font-inter font-bold  text-[18px]'>Well, that wasn't supposed to hapen... <br /> <span className='font-satoshi text-gray-600 font-normal'>{error.data.error}</span></p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className='blue_gradient'>Summary</span>
                </h2>
                <div className="summary_box">
                  <p className='font-inter font-[500] text-gray-700'>
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )
        }
      </div>
    </section>
  )
}

export default Demo