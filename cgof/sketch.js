document.ontouchmove = function(event){ event.preventDefault(); };

password(null, "1234567890");

var cells = null, nbs = [ { x:-1, y:-1 }, { x:0, y:-1 }, { x:1, y:-1 }, { x:-1, y:0 }, { x:1, y:0 }, { x:-1, y:1 }, { x:0, y:1 }, { x:1, y:1 } ];

function setup()
{
    newCanvas(500, 500, "black");
    controlAdd("INPUT", document.body, [ "style=position:absolute; top:250px; left:512px; width:200px; height:80px; border:none;", "id=click", "onclick=keyUp();", "type=button", "value=Iterate" ]);
    frameRate(30);
    cells = new Array2D(25,25);
    for(i = 0; i < cells.sizeX; i++)
        {
            for(j = 0; j < cells.sizeY; j++)
                {
                    cells.get[i][j] = new Cell(ALIVE);
                }
        }
}

function update()
{
    clear();
    stroke("gray");
    grid(20,0.5);
    for(i = 0; i < cells.sizeX; i++)
        {
            for(j = 0; j < cells.sizeY; j++)
                {
                    if(cells.get[i][j].state == ALIVE)
                        {
                            fill("white");
                            rectFill(i*20+1,j*20+1,18,18);
                        }
                }
        }
}

function mouseClicked()
{
    var x = Math.floor(mouseX/20);
    var y = Math.floor(mouseY/20);
    if(x < 0 || y < 0 || x >= cells.sizeX || y >= cells.sizeY)
        return;
    cells.get[x][y].state = cells.get[x][y].state == ALIVE ? DEAD : ALIVE;
}

function touchedDown()
{
    var x = Math.floor(touchX/20);
    var y = Math.floor(touchY/20);
    //alert(x + " " + y);
    if(x < 0 || y < 0 || x >= cells.sizeX || y >= cells.sizeY)
        return;
    cells.get[x][y].state = cells.get[x][y].state == ALIVE ? DEAD : ALIVE;
}

function keyUp()
{
    for(i = 0; i < cells.sizeX; i++)
        {
            for(j = 0; j < cells.sizeY; j++)
                {
                    var cell = cells.get[i][j];
                    //Count neighbours
                    var nbs_alive = 0;
                    for (n = 0; n < nbs.length; n++)
                        {
                            if((nbs[n].x + i) < 0 || (nbs[n].y + j) < 0 || (nbs[n].x + i) >= cells.sizeX || (nbs[n].y + j) >= cells.sizeY)
                                continue;
                            if(cells.get[nbs[n].x + i][nbs[n].y + j].state == ALIVE)
                                nbs_alive++;
                        }
                    if(cell.state == ALIVE && (nbs_alive > 3 || nbs_alive < 2 ))cell.next = KILL;
                    else if(cell.state == ALIVE)cell.next = NOTHING;
                    else if(cell.state == DEAD && nbs_alive == 3)cell.next = BIRTH;
                }
        }
    
    for(i = 0; i < cells.sizeX; i++)
        {
            for(j = 0; j < cells.sizeY; j++)
                {
                    var cell = cells.get[i][j];
                    switch(cell.next)
                        {
                            case BIRTH:
                                cell.state = ALIVE;
                                cell.next = NOTHING;
                                break;
                            case KILL:
                                cell.state = DEAD;
                                cell.next = NOTHING;
                                break;
                            default:
                                cell.next = NOTHING;
                                break;
                        }
                }
        }
}