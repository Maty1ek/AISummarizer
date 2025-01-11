import {logo} from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className='w-[112px] object-contain'/>

        <button type='button' onClick={() => window.open('https://github.com/maty1ek')} className='black_btn'>
          GitHub
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden'/> <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Enter a link to any article you want to summarize! The link must lead to an article, otherwise you will get an error.
        <br />
        Введите ссылку на любую статью, которую вы хотите кратко изложить! Ссылка должна вести на статью, иначе произойдёт ошибка.
      </h2>
    </header>
  )
}

export default Hero