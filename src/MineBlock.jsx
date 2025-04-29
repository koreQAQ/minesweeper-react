import './MineBlock.css'
function MineBlock({ block, handleClick }) {
  function getBlockState() {
    if (block.revealed) return block.mine ? 'mine' : 'displayed'
    return block.flagged ? 'flagged' : 'normal'
  }

  return (
    <button onClick={handleClick} className={'flex w-10 h-10 m-0.5 justify-center items-center border-1 border-gray-500' + ' ' + getBlockState()}>
      {block.revealed ? block.adjacentMines : ' '}
    </button>
  )
}

export default MineBlock
