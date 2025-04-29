import './MineBlock.css'
function MineBlock({ block, handleClick }) {
  function getBlockState() {
    if (block.revealed) return block.mine ? 'mine' : 'displayed text-yellow-300'
    return block.flagged ? 'flagged' : 'normal'
  }

  return (
    <button onClick={handleClick} className={'block' + ' ' + getBlockState()}>
      {block.revealed ? block.adjacentMines : ' '}
    </button>
  )
}

export default MineBlock
