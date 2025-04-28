import { useState } from 'react'
import MineBlock from './MineBlock';
import './Board.css'


const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],

    [-1, 0],
    [1, 0],

    [-1, 1],
    [0, 1],
    [1, 1],
]


function Board({ width, height }) {

    function getSiblings(block, blocks) {
        return directions.map(([dx, dy]) => {
            const ox = block.x + dx
            const oy = block.y + dy
            if (ox < 0 || ox >= 10 || oy < 0 || oy >= 10)
                return undefined
            return blocks[ox][oy]
        }).filter(Boolean)
    }

    const generatedBlocks = Array.from({ length: width },
        (_, x) => Array.from({ length: height }, (_, y) => {
            return {
                id: x + ',' + y,
                x: x,
                y: y,
                adjacentMines: 0,
                revealed: false, mine: Math.random() < 0.1, flagged: false
            }
        })
    )

    generatedBlocks.forEach((row) => {
        row.forEach((block) => {
            if (!block.mine) {
                getSiblings(block, generatedBlocks).forEach((b) => {
                    if (b.mine) {
                        block.adjacentMines += 1
                    }
                })
            }
        })
    })
    const [blocks, setBlocks] = useState(generatedBlocks);

    function handleClick(x, y) {
        const block = blocks[x][y]
        if(block.mine){
            console.log(`boom`)
            return
        }
        if(!block.revealed){
            block.revealed = true
        }
        expandZero(block)  
    }

    function expandZero(block) {
        // 返回已经修改过的board
        // 如果当前这个点不为0
        if (block.adjacentMines == 0) {
            // 0点要找到周边的0
            const siblings = getSiblings(block, blocks)
            siblings.forEach((zero) => {
                if (!zero.revealed){
                    zero.revealed = true
                    expandZero(zero)
                    const lastBlocks = blocks.slice(0)
                    setBlocks(lastBlocks)
                } 
            })
        }
    }


    const data = blocks.map(row => {
        const values = row.map(block => {
            return (
                <MineBlock block={block} handleClick={() => handleClick(block.x, block.y)} key={block.id} />
            )
        }
        )
        return (<div className="row" >{values}</div>)
    })
    return (
        <div className='board'>{data}</div>
    )
}


export default Board

