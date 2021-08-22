using Microsoft.EntityFrameworkCore.Migrations;

namespace Bioskop.Migrations
{
    public partial class v8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Film_FilmID",
                table: "FilmSala");

            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala");

            migrationBuilder.AlterColumn<int>(
                name: "SalaID",
                table: "FilmSala",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FilmID",
                table: "FilmSala",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Film_FilmID",
                table: "FilmSala",
                column: "FilmID",
                principalTable: "Film",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala",
                column: "SalaID",
                principalTable: "Sala",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Film_FilmID",
                table: "FilmSala");

            migrationBuilder.DropForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala");

            migrationBuilder.AlterColumn<int>(
                name: "SalaID",
                table: "FilmSala",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "FilmID",
                table: "FilmSala",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Film_FilmID",
                table: "FilmSala",
                column: "FilmID",
                principalTable: "Film",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FilmSala_Sala_SalaID",
                table: "FilmSala",
                column: "SalaID",
                principalTable: "Sala",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
